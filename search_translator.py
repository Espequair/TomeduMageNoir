from enum import Enum
from dataclasses import dataclass

class TOK_TYPE(Enum):
  PAR_OPEN  = 1 # (
  PAR_CLOSE = 2 # )
  QUOTED    = 3 # "Whatever is > in (here)!"
  OPERAND   = 4 # : ! < >
  OPERATOR  = 5 # everything else

@dataclass
class Token:
    ttype:      TOK_TYPE
    content:    str


def search(search_string):
  pass

def peek_next_token(search_string) -> tuple[]:
  
