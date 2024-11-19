<script>
    export const prerender = true;
	let { children } = $props();
</script>

<h1>Bienvenue sur le Tome du Mage Noir</h1>
<nav>
  <a href="/">home</a>
  <a href="/collection">collection</a>
</nav>

{@render children()}
