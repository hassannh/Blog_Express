const {deleteCategory} = require('../home')

// import {deleteCategory} from '../home'

const req = {
    params:{
        categoryId: '12'
    }
}

it('this should delete category by id', () => {


deleteCategory(req);

})