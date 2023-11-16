<!--
    table display of users first/last name, id, email
    each user has a modal connecting to...
        tabs: elibility fields, registered programs, eligible programs, pending programs 
-->

<script>
import { initializeStores } from '@skeletonlabs/skeleton';
initializeStores();
    import { onMount } from 'svelte';
    import { Table, tableMapperValues, Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { Tab, TabGroup } from 'svelte-simple-tab';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
    /**
    * @type {string | any[]}
    */
    let usersData = [];
    let selectedUser = null;
    let modalStore = getModalStore();
    onMount(async () => {
      usersData = await adminGetUsers(); // Fetch user data from the backend
    });
    let tabSet = 0;
    const tableUsers = {
      head: ['Name', 'User ID', 'Email'],
      body: tableMapperValues(usersData, ['name', 'userid', 'email']),
      meta: tableMapperValues(usersData, ['name', 'userid', 'email']),
      foot: ['Total', '', `<code class="code">${usersData.length}</code>`],
    };
    const openUserProgramModal = (/** @type {any} */ user) => {
      selectedUser = user;
      modalStore.trigger(userProgramModal);
    };
    const userProgramModal = {
      type: 'custom',
      title: 'User Program Information',
      body: `
        <TabGroup>
          <Tab bind:group={tabSet} name="tab1" value={0}>Programs Eligible For</Tab>
          <Tab bind:group={tabSet} name="tab2" value={1}>Programs Signed Up For</Tab>
          <Tab bind:group={tabSet} name="tab3" value={2}>Eligibility Information</Tab>
        </TabGroup>
        <svelte:fragment slot="panel">
          {#if tabSet === 0}
            <p>Programs Eligible For: {selectedUser?. userInfo.eligiblePrograms}</p>
          {:else if tabSet === 1}
            <p>Programs Signed Up For: {selectedUser?. userInfo.SignedUp[Programs} </p> // button to confirm signing up for programs not implemented, dummy variable for now
          {:else if tabSet === 2}
            <p>Eligibility Information: {selectedUser?.userObj.eligibility}</p>
          {/if}
        </svelte:fragment>` ,};
</script>
  
<Table source={tableUsers} on:rowClick={openUserProgramModal} />

<Modal />