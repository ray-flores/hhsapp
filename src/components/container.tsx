// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from './get-a-nurse-instance'

// Import components
import { NurseList } from './nurse-list'
import { Pagination } from './pagination'

// Import styles
import './../styles/container.css'

// Create Nurse component
export const Container = () => {
  // Prepare states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState(0);
  const [ward, setWard] = useState('');
  const [email, setEmail] = useState('');
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [nursesPerPage] = useState(5);

  // Fetch all Nurses on initial render
  useEffect(() => {
    fetchNurses()
  }, [])

  // Get current posts 
  const indexOfLastNurse = currentPage * nursesPerPage;
  const indexOfFirstNurse = indexOfLastNurse - nursesPerPage;
  const currentNurses = nurses.slice(indexOfFirstNurse, indexOfLastNurse);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  // Fetch all Nurses
  const fetchNurses = async () => {
    // Send GET request to 'Nurses/all' endpoint
    axios
      .get('http://localhost:4001/Nurses/all')
      .then(response => {
        // Update the Nurses state
        setNurses(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the nurse list: ${error}`))
  }

  // Fetch a nurse
  const handleNurseNameSubmit = async () => {
    // Send GET request to 'Nurses/name' endpoint
    api
      .get('/name', { params: { firstName: firstName, lastName: lastName} }) 
      .then(response => {

        if (response.data.length == 0) {
          console.log('no nurse exists with that name')
          fetchNurses()
        }

        // Update the Nurses state
        setNurses(response.data)
        
        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the nurse: ${error}`))
  }

  // Fetch a nurse
  const handleNurseWardSubmit = async () => {
    // Send GET request to 'Nurses/ward' endpoint
    api
      .get('/ward', { params: { ward: ward } }) 
      .then(response => {

        if (response.data.length == 0) {
          console.log('no nurse works in that ward')
          fetchNurses()
        }

        // Update the Nurses state
        setNurses(response.data)
        
        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the ward nurse(s): ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setFirstName('')
    setLastName('')
    setId(0)
    setWard('')
    setEmail('')
  }

  // Set all input fields to current nurse
  const handleInputsCurrent = (id: number, firstName: string, lastName: string, email: string, ward:string) => {
    setFirstName(firstName)
    setLastName(lastName)
    setWard(ward)
    setEmail(email)
    setId(id)
  }

  // Create new nurse
  const handleNurseCreate = () => {
    // Send POST request to 'Nurses/create' endpoint
    axios
      .post('http://localhost:4001/Nurses/create', {
        firstName: firstName,
        lastName: lastName,
        ward: ward,
        email: email
      })
      .then(res => {
        console.log(res.data, 'in handleNurseCreate')

        // Fetch all Nurses to refresh
        // the Nurses on the nurse list
        fetchNurses()
      })
      .catch(error => console.error(`There was an error creating nurse ${firstName} ${lastName}: ${error}`))
  }

  // Submit new nurse
  const handleNurseSubmit = () => {
    // Check if all fields are filled
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && ward.length > 0 && (ward == 'Blue' || ward == 'Yellow' || ward == 'Green' || ward == 'Red')) {
      // Create new nurse
      handleNurseCreate()

      console.info(`Nurse ${firstName} ${lastName} was added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Update a nurse record
  const handleNurseSave = () => {
    // Check that all fields are filled
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && ward.length > 0 && (ward == 'Blue' || ward == 'Yellow' || ward == 'Green' || ward == 'Red')) {
      // Send PUT request to 'Nurses/update' endpoint
      axios
      .put('http://localhost:4001/Nurses/update', { id: id, firstName: firstName, lastName: lastName, email: email, ward: ward })
      .then(() => {
        console.log(`Nurse ${id} updated.`)

        // Reset all input fields
        handleInputsReset()
        
        // Fetch all Nurses to refresh
        // the Nurses on the nurse list
        fetchNurses()
      })
      .catch(error => console.error(`There was an error updating nurse ${firstName} ${lastName}: ${error}`))
      }
  }

  // Make a nurse record editable
  const handleNurseEdit = (id: number, firstName: string, lastName: string, email: string, ward:string) => {
    // Set current form values to selected nurse
    handleInputsCurrent(id, firstName, lastName, email, ward);
    
    console.info(`Nurse ${firstName} ${lastName} can be updated.`)
  }

  // Remove nurse
  const handleNurseRemove = (id: number) => {
    // Send PUT request to 'Nurses/delete' endpoint
    axios
      .put('http://localhost:4001/Nurses/delete', { id: id })
      .then(() => {
        console.log(`Nurse ${id} removed.`)

        // Fetch all Nurses to refresh
        // the Nurses on the nurse list
        fetchNurses()
      })
      .catch(error => console.error(`There was an error removing the ${id} nurse: ${error}`))
  }

  // Reset nurse list (remove all Nurses)
  const handleListReset = () => {
    // Send PUT request to 'Nurses/reset' endpoint
    axios.put('http://localhost:4001/Nurses/reset')
      .then(() => {
        // Fetch all Nurses to refresh
        // the Nurses on the nurse list
        fetchNurses()
      })
      .catch(error => console.error(`There was an error resetting the nurse list: ${error}`))
  }

  return (
    <div className="nurse-list-wrapper">
      <div className="nurse-list-form">

        {/* Form for searching ? */}
        <div className="form-wrapper">
        </div>

        {/* Form for creating new nurse */}
        <div className="form-wrapper" onSubmit={handleNurseSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="firstName">Enter first name:</label>
              <input className="form-input" type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="lastName">Enter last name:</label>
              <input className="form-input" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="email">Enter email:</label>
              <input className="form-input" type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="ward">Ward:</label>
              <input className="form-input" type="text" id="ward" name="ward" value={ward} onChange={(e) => setWard(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <div className='btn-grp'>
          <button onClick={handleNurseSubmit} className="btn btn-add">Add nurse</button>
          <button onClick={handleNurseNameSubmit} className="btn btn-find">Find nurse(s) by name</button>
          <button onClick={handleNurseWardSubmit} className="btn btn-find">Find nurse(s) by ward</button>
          {/* Show save button if form contains a nurse's info */}
          { id > 0 && (
          <button onClick={handleNurseSave} className="btn btn-save">Save changes</button>
          )}
        </div>

      </div>

      {/* Render nurse list component */}
      <NurseList nurses={currentNurses} loading={loading} handleNurseRemove={handleNurseRemove} handleNurseEdit={handleNurseEdit} />
      <Pagination paginate={paginate} totalNurses={nurses.length} nursesPerPage={nursesPerPage} />
      {/* Show reset button if list contains at least one nurse */}
      { nurses.length > 10 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset Nurses list.</button>
      )}
    </div>
  )
}