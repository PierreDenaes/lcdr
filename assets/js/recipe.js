import { Tab } from 'bootstrap';
import '../styles/site/recipe.scss';

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    const recipesList = document.getElementById('recipes-list');
    const recipeFormNew = document.getElementById('recipe-form-new');
    const notification = document.getElementById('notification');

    // Gestion des ingrédients
    function handleAddIngredient(list) {
        const addButton = document.getElementById('add-ingredient');
        const newWidget = list.dataset.prototype;
        let index = list.children.length;

        addButton.addEventListener('click', () => {
            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
            newLi.innerHTML = newWidget.replace(/__name__/g, index) + '<button type="button" class="remove-ingredient btn btn-danger mt-1">Supprimer</button>';
            list.appendChild(newLi);
            index++;
        });

        list.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('remove-ingredient')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Gestion des étapes de recette
    function handleAddStep(list) {
        const addButton = document.getElementById('add-etapeRecette');
        const newWidget = list.dataset.prototype;
        let index = list.children.length;

        addButton.addEventListener('click', () => {
            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
            newLi.innerHTML = newWidget.replace(/__name__/g, index) + '<button type="button" class="remove-etapeRecette btn btn-danger mt-1">Supprimer</button>';
            list.appendChild(newLi);
            index++;
        });

        list.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('remove-etapeRecette')) {
                e.target.parentElement.remove();
            }
        });
    }

    // Chargement des recettes
    function loadRecipes() {
        fetch('/profile/recipes')
            .then(response => response.json())
            .then(data => {
                recipesList.innerHTML = '';
                data.forEach(recipe => {
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('col-md-4');
                    recipeCard.innerHTML = `
                        <div class="card mb-3">
                            <img src="/images/recipes/${recipe.imageName || 'default/default-recipe.webp'}" class="card-img-top" alt="${recipe.title}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                                <p class="card-text">${recipe.description}</p>
                                <button class="btn btn-primary" onclick="viewRecipe(${recipe.id})">Voir</button>
                                <button class="btn btn-secondary" onclick="editRecipe(${recipe.id})">Modifier</button>
                                <button class="btn btn-danger" data-id="${recipe.id}" data-image-name="${recipe.imageName}">Supprimer</button>
                            </div>
                        </div>
                    `;
                    recipesList.appendChild(recipeCard);
                });
                attachDeleteHandlers();
            });
    }

    loadRecipes();

    // Fonction pour afficher une recette
    window.viewRecipe = function(id) {
        fetch(`/profile/recipes/${id}`)
            .then(response => response.json())
            .then(data => {
                alert(`Titre: ${data.title}\nDescription: ${data.description}`);
            });
    };

    // Gestionnaire pour les boutons de suppression
    function attachDeleteHandlers() {
        const deleteButtons = document.querySelectorAll('.btn-danger[data-id]');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const imageName = this.getAttribute('data-image-name');
                const csrfToken = recipesList.getAttribute('data-csrf-token');

                if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
                    fetch(`/profile/recipes/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({ imageName: imageName })
                    }).then(response => {
                        if (response.ok) {
                            showNotification('Recette supprimée avec succès!');
                            loadRecipes();
                        } else {
                            alert('Erreur lors de la suppression de la recette.');
                        }
                    });
                }
            });
        });
    }

    // Fonction pour afficher les notifications
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Soumission du formulaire de création de recette
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
                showNotification('Recette créée avec succès!');
                const tabTrigger = new Tab(document.querySelector('.nav-link[href="#recipes"]'));
                tabTrigger.show();
                loadRecipes();
            } else {
                alert('Erreur lors de la création de la recette.');
            }
        });
    });

    // Initialisation des listes d'ingrédients et d'étapes pour le formulaire de création
    const ingredientListNew = document.getElementById('ingredient-list');
    if (ingredientListNew) {
        handleAddIngredient(ingredientListNew);
    }

    const etapeRecettesListNew = document.getElementById('etapeRecettes-list');
    if (etapeRecettesListNew) {
        handleAddStep(etapeRecettesListNew);
    }
}