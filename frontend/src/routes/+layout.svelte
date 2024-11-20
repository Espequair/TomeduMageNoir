<script>
    let { children } = $props();
    import { base } from '$app/paths';
</script>

<h1>Bienvenue sur le Tome du Mage Noir</h1>
<nav>
  <a href="{base}/">home</a>
  <a href="{base}/collection">collection</a>
</nav>

{@render children()}
