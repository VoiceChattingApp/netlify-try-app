import React from 'react'
import classes from './NoUserProfile.module.css'
const NoUserProfile=()=>{
  return (
    <div className={classes.wrapper}>
  <div className={classes.TextHolder}>
    <div className={classes.Texts}>
      <div className={classes.FourOhFour}>404</div>
      <div className={classes.Maybe}>GUH.. Maybe.. You Entered Wrong Address</div>
      <div className={classes.Bad}>This User couldn't be found.</div>
      
    </div>
  </div>
  <div className={classes.Body}> 
    <div className={classes.LeftEye}></div>
    <div className={classes.RightEye}></div>
    <div className={classes.EyeShadows}></div>
    <div className={classes.Mouth}></div>
    <div className={classes.MouthShadows}></div>
    <div className={classes.Theet}></div>
    <div className={classes.BodyTexture}></div>
  </div>
  <div className={classes.Horns}>
    <div className={classes.HornsExtras}></div>
  </div>
  <div className={classes.LeftHand}></div>
  <div className={classes.RightHand}></div>
</div>
  )
}

export default NoUserProfile;

