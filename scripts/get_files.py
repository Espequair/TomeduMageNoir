from typing import Any
from bs4 import BeautifulSoup as bs4, NavigableString
import json
import requests
from time import sleep
from os import access, listdir, getcwd, chdir, mkdir, F_OK
from os.path import isfile, join
import re

# "https://magenoir.com/collection_fr.html"
# "collection.html"


def get_text_of_url(url: str, encoding: str | None = "utf-8") -> str:
  """
  Returns the full html text of a webpage, in the utf-8 encoding
  """
  r = requests.get(url)
  if encoding is not None:
    r.encoding = encoding
  return r.text


def text_to_file(text: str, file_name: str):
  """
  Writes the full text given to it to a file, encoded in utf-8
  """
  with open(file_name, "w", encoding="utf-8") as f:
    f.write(text)


def json_to_file(json_data, file_name: str):
  """
  Writes a Python object as a JSON in a file
  """
  text_to_file(json.dumps(json_data, indent=2, ensure_ascii=False), file_name)


def url_content_to_file(url: str,
                        file_name: str,
                        encoding: str | None = "utf-8"):
  """
  Writes the content of a page into a file, utf-8 encoding
  """
  text_to_file(get_text_of_url(url), file_name)


def get_card_name_and_link(card_html: NavigableString) -> tuple[str, str]:
  """
  From a "card" div in the catalog page, gets the name and link of the card
  """
  card_link = card_html.find("a").get("href")
  card_name = card_link.rsplit("/")[-1].split(".")[0]
  return (card_name, card_link)


def get_list_of_cards(in_file_name: str = "collection.html",
                      out_file_name: str = "cards_dict.json"):
  """
  From the catalog page's html, will extract the name and link of cards to put them in a json and write it to a file
  """
  with open(in_file_name, "r", encoding="utf-8") as file:
    soup = bs4(file, "html.parser", from_encoding="utf-8")
    print(soup.original_encoding)
  cards_dict = {}
  for card_div in soup.find_all("div", "card"):
    (card_name, card_link) = get_card_name_and_link(card_div)
    cards_dict[card_name] = card_link
  json_to_file(cards_dict, "cards_dict.json")


def get_cards_html(in_file_name: str):
  """
  Gets the html of every card in a json, stores it each in a file
  """
  if not access("cards_html", F_OK):
    mkdir("cards_html")
  with open(in_file_name, "r", encoding="utf-8") as file:
    cards = json.loads(file.read())
  for name, link in cards.items():
    card_file_name = f"cards_html/{name}.html"
    url_content_to_file(f"https://magenoir.com/{link}", card_file_name)
    with open(card_file_name, "r", encoding="utf-8") as card_file:
      card_soup = bs4(card_file, "html.parser").find("div", "card-details")
    text_to_file(str(card_soup), card_file_name)
    sleep(1)


def extract_costs(text: NavigableString) -> dict[str, int]:
  """
  Extracts the costs in mana or components of a card
  """
  costs = [comp.text.strip() for comp in text.find_all("li")]
  costs_dict = {}
  if len(costs) == 0:
    return costs_dict
  for cost in costs:
    q = cost.split(" ")
    quantity = q[0].strip()
    value = q[-1].strip()
    costs_dict[value] = int(quantity) if quantity.isdecimal() else quantity
  return costs_dict


def extract_card_details_from_file(file_name: str,
                                   language: str) -> dict[str, Any]:
  """
  Extracts the details of a card
  """
  with open(file_name, "r", encoding="utf-8") as file:
    card_soup = bs4(file, "html.parser")
    for br in card_soup.select("br"):
      br.replace_with("\n")

    details_table = card_soup.find(
        "table", class_="card-details-infos-table").find_all("tr")
    details_dict = []
    PV_shift = False
    limit_shift = False
    for details in details_table:
      rows = details.find_all("td")
      if len(rows) < 2:
        continue
      details_title = details.find_all("td")[0].text[0:-3]
      if details_title == "Limite en deck":
        limit_shift = True
      if details_title == "PV" or details_title == "HP":
        PV_shift = True
      details_value = details.find_all("td")[1]
      details_dict.append(details_value)

    total_shift = PV_shift + limit_shift
    card = {}
    mn_image_link = card_soup.find("img", alt="image")["src"][9:]
    card["slug"] = file_name.split("/")[1][:-5]
    card["mn_image_link"] = f"https://magenoir.com/{mn_image_link}"
    card["language"] = language
    card["competitive_limit"] = 4
    card["other_languages"] = {}
    card["name"] = details_dict[0].text.strip()
    card["element"] = details_dict[1 + limit_shift].text.strip()
    type = details_dict[2 + limit_shift].text.strip()
    type = type.replace(":", "-").split("-")
    card["type"] = type[0].strip()
    card["subtype"] = ""
    if len(type) > 1:
      card["subtype"] = type[1].strip()
    card["lifepoints"] = details_dict[
        3 + limit_shift].text.strip() if PV_shift else None
    card["mana_cost"] = extract_costs(details_dict[3 + total_shift])
    card["components"] = extract_costs(details_dict[4 + total_shift])
    card["effect"] = details_dict[5 + total_shift].text.strip()
    card["full_name"] = card["name"]
    transmutable_elements = re.search("Transmutable : (\w+)(, (\w+))*", card["effect"])
    if transmutable_elements:
      transmutable_elements = transmutable_elements.group()[15:].split(", ")
      card["full_name"] += f" {" ".join(transmutable_elements)}"
    card["illustration"] = details_dict[6 + total_shift].text.strip()
    card["flavor_text"] = details_dict[7 + total_shift].text.strip()
    card["extension"] = details_dict[8 + total_shift].text.strip()
    card["notes"] = [
        notes.text
        for notes in card_soup.find("table", class_="table").find_all("td")
    ]
    return card


def get_cards_json_from_html(in_file_name: str, out_file_name: str):
  """
  Makes a JSON from a folder of html
  """
  onlyfiles = [
      join(in_file_name, f) for f in listdir("cards_html")
      if isfile(join("cards_html", f))
  ]
  cards_dict = []
  for file_name in onlyfiles:
    cards_dict.append(extract_card_details_from_file(file_name, "fr"))
  json_to_file(cards_dict, "cards_catalog.json")


def get_images(in_file_name: str = "cards_catalog.json",
               cards_image_folder_name: str = "cards_img/"):
  """
  Gets the images of every card
  """
  if not access(cards_image_folder_name, F_OK):
    mkdir(cards_image_folder_name)
  with open(in_file_name) as file:
    card_catalog = json.loads(file.read())
  for card in card_catalog:
    with open(f"{cards_image_folder_name}{card['slug']}.png",
              "wb") as card_image_file:
      print("downloading image for " +
            f"{cards_image_folder_name}{card['slug']}")
      card_request = requests.get(card["mn_image_link"])
      card_image_file.write(card_request.content)
    sleep(1)


def get_pictograms(pictogram_folder_name: str = "pict"):
  """
  Gets the pictograms
  """
  if not access(pictogram_folder_name, F_OK):
    mkdir(pictogram_folder_name)
  elements = ["fire", "air", "mineral", "arcane", "vegetal", "water"]
  for e in elements:
    with open(f"{pictogram_folder_name}/{e}_icon.png", "wb") as pict_file:
      pict_request = requests.get(
          f"https://magenoir.com/img/mage-noir/pictograms/{e}_icon.png")
      pict_file.write(pict_request.content)


def do_everything(workspace="workspace"):
  if not access(workspace, F_OK):
    mkdir(workspace)
  print(getcwd())
  chdir(workspace)
  print(getcwd())
  url_content_to_file("https://magenoir.com/collection_fr.html",
                      "collection.html")
  get_list_of_cards()
  get_cards_html("cards_dict.json")
  get_cards_json_from_html("cards_html", "cards_catalog.json")
  get_images()
