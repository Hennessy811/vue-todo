var app7 = new Vue({
    el: '#app-7',
    data: {
        usrInput: '',
        groceryList: [
            { id: 0, title: 'Овощи' },
            { id: 1, title: 'Сыр' },
            { id: 2, title: 'Что там ещё люди едят?' }
        ],
        isAddingNew: false
    },
    created: function(){
        this.getUpdate()
    },
    methods: {
        addItem: function () {
            this.usrInput ? this.groceryList.push({ id: 3, title: this.usrInput, completed: false }) : console.log('type something')
            this.isAddingNew = false;
            this.sendUpdate();
            this.usrInput = '';
            console.log(this.groceryList)
        },
        removeItem: function() {
            this.groceryList = this.groceryList.filter(function(item, i, arr) {
                if (item.id != event.target.id) return item;
            });
            this.sendUpdate();
        },
        getUpdate: function() {
            promise = fetch('https://jsonplaceholder.typicode.com/users/1/todos', { 
                method: 'GET',
                mode: 'cors',
                cache: 'default' 
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.groceryList = data
            })
            .catch(error => console.log(error))
        },
        sendUpdate: function() {
            promise = fetch('https://jsonplaceholder.typicode.com/todos', { 
                method: 'POST',
                body: JSON.stringify(this.groceryList)
            })
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data)
            //     this.groceryList = data                
            // })

            .catch(err => console.log(err))
        }
    }
  })