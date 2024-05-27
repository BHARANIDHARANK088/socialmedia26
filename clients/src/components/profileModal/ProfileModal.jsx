import { Modal, useMantineTheme } from "@mantine/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileModal.css";

import { uploadImage } from "../../apiRequest/postRequest";
import { updateUserCall } from "../../apiCalls";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...others } = data;
  const [formData, setFormData] = useState(others);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { user, dispatch } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value});
  }

  const onImageChange = (event) => {
    if ( event.target.files && event.target.files[0] )
    {
       let img = event.target.files[0];
       event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
    }
  }

  let userData = formData;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( profileImage )
    {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;
      try {
        await uploadImage(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    if ( coverImage )
    {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        await uploadImage(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    updateUserCall(user._id, userData, dispatch);
    setModalOpened(false);
    window.location.reload();
  }

  console.log("User data", userData);
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="70%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    > 
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        {/* 150 onChange={handleChange} and value in all the inputs*/}
        <div className="inputs">
          <input
            type="text"
            className="infoInput"
            name="about"
            placeholder="About"
            onChange={handleChange}
            value={formData.country}
            autoComplete="off"
          />

          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
            autoComplete="off"
          />
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesIn}
            autoComplete="off"
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
            autoComplete="off"
          />
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
            autoComplete="off"
          />
        </div>


        {/* 152 onImageChange */}
        <div className="files">
            Profile Image 
            <input type="file" name="profileImage" onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange}/>
            {/* 153 onSubmit */}
           <button className="button infoButton" type="submit">Update</button>
        </div>
  
      </form>
    </Modal>
  );
}

export default ProfileModal;