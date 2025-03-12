<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase.js";
    import "../app.css";

    let newExperience = "";
    let experiences = [];
    let showCheckmark = false; // State for checkmark animation

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
        if (!newExperience.trim()) return;

        const { error } = await supabase
            .from("experiences")
            .insert([{ text: newExperience, count: 1 }]);

        if (error) {
            console.error("Error adding experience:", error);
            return;
        }

        showCheckmark = true; // Show checkmark animation
        newExperience = ""; // Clear input field
        await loadExperiences(); // Refresh experience list

        // Hide checkmark after 2 seconds
        setTimeout(() => {
            showCheckmark = false;
        }, 2000);
    }

    // Increase count when user has done the same experience
    async function incrementCount(id) {
        const { error } = await supabase
            .from("experiences")
            .update({ count: experiences.find(exp => exp.id === id).count + 1 })
            .eq("id", id)
            .select();

        if (error) {
            console.error("Error updating count:", error);
            return;
        }

        await loadExperiences(); // Refresh list after update
    }

    onMount(() => {
        loadExperiences();
    });
</script>

<main class="container">
    <h1>Miten moni on tehnyt tämän?</h1>

    <!-- Add new experience -->
    <article class="form-container">
        <label for="experience">Kirjoita kokemus</label>
        <input type="text" id="experience" bind:value={newExperience} />
        <button on:click={addExperience} class="add-button">
            Lisää kokemus
        </button>
        {#if showCheckmark}
            <span class="checkmark">✔ Kokemus lisätty!</span>
        {/if}
    </article>

    <!-- Experience list -->
    <section class="experience-list">
        {#each experiences as exp}
            <article class="experience-card">
                <p>{exp.text} ({exp.count} ihmistä)</p>
                <button on:click={() => incrementCount(exp.id)}>Minäkin!</button>
            </article>
        {/each}
    </section>
</main>
