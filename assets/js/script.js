document.addEventListener('DOMContentLoaded', () => {
    const postDataButton = document.getElementById('postDataButton');
    const dataList = document.getElementById('dataList');
    const postDataContainer = document.getElementById('post-data');
    const errorMessage = document.getElementById('errorMessage');
    const errorDetail = document.createElement('p');

    const getApiData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Error al traer los datos');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    const showData = async () => {
        try {
            dataList.innerHTML = '';
            const responseData = await getApiData();
            if (responseData.length === 0) {
                errorDetail.textContent = 'No se encontraron datos';
                errorMessage.appendChild(errorDetail);
                errorMessage.style.display = 'block';
            } else {
                postDataContainer.style.display = 'block';
                responseData.forEach(data => {
                    const listItem = document.createElement('li');
                    const titleItem = document.createElement('h4');
                    const bodyItem = document.createElement('p');
                    titleItem.textContent = data.title;
                    bodyItem.textContent = data.body;
                    listItem.appendChild(titleItem);
                    listItem.appendChild(bodyItem);
                    dataList.appendChild(listItem);
                });
            }
        } catch (error) {
            errorDetail.textContent = error.message;
            errorMessage.appendChild(errorDetail);
            errorMessage.style.display = 'block';
        }
    };

    postDataButton.addEventListener('click', showData);
});
