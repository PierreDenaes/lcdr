export function handleAddIngredient(list) {
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

export function handleAddStep(list) {
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