import React from "react";
import "./scss/profile.css";
export default function Profile() {
  return (
    <div className="profile">
      <div className="profile_cn">
        <section className="profile_pic_section">
          <div className="pic_div">
            <img
              src="http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
              alt="img"
              style={{ width: "200px" }}
              className="userImg"
            />
            <div className="user_info_div">
              <h4>my name is mamoun</h4>
              <p>mamoun.bursi@yahoo.com</p>
            </div>
            <button className="userImgBtn">update profile image</button>
          </div>

          <div className="socials_div">


          </div>
        </section>

        <section className="profile_info_section">
          <h2>profile information</h2>
          <form>
            <div className="formInput">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" />
            </div>
            <div className="formInput">
              <label htmlFor="birthDate">birthDate</label>
              <input type="date" name="birthDate" />
            </div>
            <div className="formInput">
              <label htmlFor="gender">Gender</label>
              <select>
                <option name="male" id="">
                  male
                </option>
                <option name="female" id="">
                  female
                </option>
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="phone">Phone</label>
              <input type="number" name="phone" />
            </div>
            <div className="formInput">
              <label htmlFor="country">country</label>
              <input type="text" name="country" />
            </div>
            <div className="formInput">
              <label htmlFor="city">city</label>
              <input type="text" name="city" />
            </div>
          </form>
          <button> save changes</button>
        </section>
      </div>
    </div>
  );
}
