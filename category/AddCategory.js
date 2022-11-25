import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';

import MoodleService from '../MoodleService';
import SyncMoodleService from '../SyncMoodleService';
import CategoryService from '../category/CategoryService';

const AddCategory = () => {
    const [categoryname, setCategoryname] = useState('');
    const [categorydescription, setCategorydescription] = useState('');


    const saveCategory = async (e) => {
        e.preventDefault();
        await CategoryService.addCategory({
          name: categoryname,
          description: categorydescription
        }).then((data) => {
          if (!data.data.error) {
            console.log('Inserted category:', data.data.messages);
            const datacategory = data.data.messages.data; 
            const categoryid = datacategory.id;
    
            MoodleService.addCategory(categoryname,categorydescription)
            .then((data) => {
              const coursecategoryid = data.data[0].id;    
              console.log('Category moodle data:', data.data[0]);
    
              const syncData = {
                'categoryid': categoryid,
                'coursecategoryid': coursecategoryid
              }

              console.log('Sync data: ',syncData);

              SyncMoodleService.addCourseCategory(syncData)
              .then((data) => {
                console.log(data)            
              })       
            })
          }          
        })    
      }
  return (
    <div>
        AddCategory<br />
        <form onSubmit={saveCategory}>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Title</label>
              <div className='col-sm-10'><input 
                type="text"
                className="form-control"
                value={ categoryname } 
                onChange={ (e) => setCategoryname(e.target.value) }
                placeholder="Category Title"
              /></div>          
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className='col-sm-10'><textarea
                className="form-control"            
                placeholder="Category Description"
                value={categorydescription}
                onInput={ (e) => setCategorydescription(e.target.value) }
              >          
              </textarea></div>
            </div>
            <div className="field">
              <Link title='Save' className='btn btn-outline-success btn-sm' onClick={saveCategory}><AiIcons.AiFillSave size={18} />Save</Link>
            </div>
        </form>    
    </div>
  )
}

export default AddCategory