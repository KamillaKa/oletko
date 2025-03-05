<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase.js";
    import "../app.css";

    let newExperience = "";
    let experiences = [];

    // Load experiences from database
    async function loadExperiences() {
        const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .order("count", { ascending: false });

        if (error) {
            console.error("Error loading experiences:", error);
            return;
        }

        experiences = data || [];
    }

    // Add new experience
    async function addExperience() {
        if (!newExperience.trim()) return; // Prevent empty inputs

        const { error } = await supabase
            .from("experiences")
            .insert([{ text: newExperience, count: 1 }]);

        if (error) {
            console.error("Error adding experience:", error);
            return;
        }

        newExperience = ""; // Clear input field
        await loadExperiences(); // Reload experiences list
    }

    // Increase count when user has done the same experience
    async function incrementCount(id) {
    console.log("Updating experience with ID:", id);

    const { data, error } = await supabase
        .from("experiences")
        .update({ count: experiences.find(exp => exp.id === id).count + 1 }) // Increment manually
        .eq("id", id)
        .select(); // Fetch updated row

    if (error) {
        console.error("Error updating count:", error);
        return;
    }

    console.log("Updated experience:", data);
    await loadExperiences(); // Refresh the list after update
}



    onMount(() => {
        loadExperiences();
    });
</script>

<main class="container">
    <h1>Miten moni on tehnyt tämän?</h1>

    <!-- Add new experience -->
    <article>
        <label for="experience">Kirjoita kokemus</label>
        <input type="text" id="experience" bind:value={newExperience} />
        <button on:click={addExperience}>Lisää kokemus</button>
    </article>

    <!-- Experience list -->
    <section>
        {#each experiences as exp}
            <article>
                <p>{exp.text} ({exp.count} ihmistä)</p>
                <button on:click={() => incrementCount(exp.id)}>Minäkin!</button>
            </article>
        {/each}
    </section>
</main>
