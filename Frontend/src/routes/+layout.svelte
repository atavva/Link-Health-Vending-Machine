<script>
  import "../app.css";
  import languageIcon from "../Images/language.svg";
</script>

<div class="nav">
  <div>
    <h1>Logo</h1>
  </div>
  <div>
    <img src="../Images/language.svg" alt="Change Language" />
    <h1>文<sub>A</sub></h1>
    <h1>All Programs</h1>
    <h1>Users</h1>
  </div>
</div>
<slot />

<style>
  .nav {
    background-color: var(--col-pri);
    color: var(--col-txt);
    display: flex;
  }
</style>
