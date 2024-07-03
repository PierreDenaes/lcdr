import { handleAddIngredient, handleAddStep } from './formHandlers';
import { loadRecipes, viewRecipe, attachDeleteHandlers, editRecipe } from './recipeHandlers';
import { showNotification } from './notificationHandlers';
import { Tab } from 'bootstrap';

export function initializePage() {
    const recipesList = document.getElementById('recipes-list');
    const recipeFormNew = document.getElementById('recipe-form-new');
    const notification = document.getElementById('notification');

    loadRecipes(recipesList, attachDeleteHandlers);

    window.viewRecipe = viewRecipe;
    window.editRecipe = editRecipe;

    recipeFormNew.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(recipeFormNew);
        const url = recipeFormNew.action;

        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                recipeFormNew.reset();
                showNotification(notification, 'Recette créée avec succès!');
                loadRecipes(recipesList, attachDeleteHandlers);
                const tabTrigger = new Tab(document.querySelector('.nav-link[href="#recipes"]'));
                tabTrigger.show();
            } else {
                alert('Erreur lors de la création de la recette.');
            }
        });
    });

    const ingredientListNew = document.getElementById('ingredient-list');
    if (ingredientListNew) {
        handleAddIngredient(ingredientListNew);
    }

    const etapeRecettesListNew = document.getElementById('etapeRecettes-list');
    if (etapeRecettesListNew) {
        handleAddStep(etapeRecettesListNew);
    }
}