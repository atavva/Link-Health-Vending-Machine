<script>
  import { onMount } from 'svelte';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	let dataE = {
		Question: 'Hello World',
		Answered: 0
	};
    let dataA = { 
		Question: 'buebue bue',
		Answered: "lorem upsium"
	
    }
	let data = [dataE, dataE, dataA];

  let questionsAsked = 0

  function updateQuestion(){
    questionsAsked += 1
  }

  let question = null;
// Total Max question is 0 -> USer page
  async function getNextQuestion() {
    const response = await fetch('http://127.0.0.1:3000/api/eligibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eligiblePrograms: [], // List of program IDs
        ineligiblePrograms: [], // List of program IDs
        eligibility: { // User eligibility info
            agi: 35000,
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      question = result.data;
    }
  }

  onMount(getNextQuestion);

</script>

{#if question}
  <h1>{question.Question}</h1>
  <p>Field Name: {question['Field Name']}</p>
  <p>Expected Type: {question['Expected Type']}</p>
{:else}
  <p>Loading next question...</p>
{/if}

<!-- This is only an example we will have to fully integrate this as we go on -->
<Stepper>
	{#each data as d}
		<Step>
			<svelte:fragment slot="header">{d.Question}</svelte:fragment>
			{d.Answered}
		</Step>
	{/each}
</Stepper>