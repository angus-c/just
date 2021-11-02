<script lang="ts">
  import Header from '$lib/Header/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  import '../app.scss';
</script>

<Header />

<slot />

<Footer />
