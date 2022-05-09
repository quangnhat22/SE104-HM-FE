const initialState = [
    { 
        id: '',
        nameRoom: '',
        typeRoom: '',
        price: 0,
        note: '',
        status: '',
        customers: [
            {
                id: '',
                citizenIdentification: '',
                name: '',
                typeCustomer: '',
                address: ''
            }
        ]
    }
]

export default (state = initialState, action) => {
  switch (action.type) {


  default:
    return state
  }
}
