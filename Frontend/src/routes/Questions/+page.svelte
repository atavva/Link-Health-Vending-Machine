<script>
  import { onMount } from 'svelte';
  let question = null;

  async function getNextQuestion() {
    const response = await fetch('http://127.0.0.1:3000/api/eligibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eligiblePrograms: [1, 3], // List of program IDs
        ineligiblePrograms: [2, 7], // List of program IDs
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