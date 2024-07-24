import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './List.css'
import { useDispatch, useSelector } from 'react-redux';
import { listContacts, deleteContact, searchContacts } from '../contact/contactSlice';
import { useNavigate } from 'react-router-dom';

const List = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('firstname');
  const [sortTerm, setSortTerm] = useState('firstname');
  const { contact = [], message } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [first, setFirst] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedContacts = [...contact].sort((a, b) => {
    if (a[sortTerm] < b[sortTerm]) return -1;
    if (a[sortTerm] > b[sortTerm]) return 1;
    return 0;
  });

  const last = currentPage * postsPerPage;
  const displayedContacts = sortedContacts.slice(first, last);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(contact.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleLeft = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setFirst((newPage - 1) * postsPerPage);
    }
  };

  const handleRight = () => {
    if (currentPage < pageNumbers.length) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setFirst(newPage * postsPerPage - postsPerPage);
    }
  };

  const handlePage = (value) => {
    setCurrentPage(value);
    setFirst((value - 1) * postsPerPage);
  }

  const fetchContacts = () => {
    dispatch(listContacts());
    navigate('/contact');
  }

  useEffect(() => {
    if (message === 'idle') {
      fetchContacts();
    }
  }, [message]);

  const handleDelete = (first_name, last_name, address, company, phone_number) => {
    dispatch(deleteContact({ first_name, last_name, address, company, phone_number }));
    dispatch(listContacts());
    navigate('/contact');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchContacts({ filter, searchTerm }));
    navigate('/contact');
  };

  const handleEditContact = (contact) => {
    navigate('/add', { state: { user: contact } });
  }

  return (
    <div className="list-container">
      <form onSubmit={handleSearch} className='search-box'>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="company">Company</option>
          <option value="address">Address</option>
          <option value="phonenumber">Phone Number</option>
        </select>
        <input type="text" placeholder='Search contacts' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
        <div>
          <img src={assets.send_icon} alt="" type="submit" />
        </div>
      </form>

      <div className="list-heading">
        <h2>Contacts Information</h2>
        <div className='list-filter'>
          <p>Sort Contacts by </p>
          <select value={sortTerm} onChange={(e) => setSortTerm(e.target.value)}>
            <option value="firstname">First Name</option>
            <option value="address">Address</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div className='list-filter'>
          <p>Contacts per page</p>
          <select value={postsPerPage} onChange={(e) => {
            setPostsPerPage(Number(e.target.value));
            setCurrentPage(1);
            setFirst(0);
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="list-box">
        <div className='list-table'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Company</th>
                <th>Phone Number</th>
                <th>Update Contact</th>
              </tr>
            </thead>
            <tbody>
              {
                displayedContacts.length > 0 ? (
                  displayedContacts.map((i, index) => (
                    <tr key={index}>
                      <td>{i.first_name}</td>
                      <td>{i.last_name}</td>
                      <td>{i.address}</td>
                      <td>{i.company}</td>
                      <td>{i.phone_number}</td>
                      <td className='update-button'>
                        <button onClick={() => handleEditContact(i)}>Edit</button>
                        <button onClick={() => handleDelete(i.first_name, i.last_name, i.address, i.company, i.phone_number)}>Delete</button>
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td colSpan="6">No Contacts available</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="main-bottom">
        <button className='page' onClick={handleLeft}>&#171;</button>
        {pageNumbers.length > 0 && pageNumbers.map((i) => (
          <button key={i} className={`page ${currentPage === i ? 'active' : ''}`} onClick={() => handlePage(i)}>
            {i}
          </button>
        ))}
        <button className='page' onClick={handleRight}>&#187;</button>
      </div>
    </div>
  )
}

export default List;
