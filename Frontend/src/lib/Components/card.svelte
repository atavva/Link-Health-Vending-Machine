<script lang="ts">
import type { program } from "../../Types/program";
let p: program;    
  function sign_Up(){
    alert("NOT IMPLEMENTED")
  }
</script>

<div>
  <a href={p.card_url}>
    <h1>{p.card_title}</h1>
    <img src={p.card_img_link} alt="{p.card_title} Image" />
    <p>{p.card_l_description}</p>
    <button on:click={sign_Up()}>Sign Up</button>
  </a>
</div>
