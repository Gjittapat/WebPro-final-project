import React from 'react'

function Form() {
    return (
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
            <label for="name" class="form__label">Name</label>
        </div>
    )
}

export default Form