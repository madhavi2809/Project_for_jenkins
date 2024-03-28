// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import InputControl from "../InputControl/InputControl";
// import { auth } from "../../firebase";
// import styles from "./Signup.module.css";

// function Signup() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     pass: "",
//     confirm: "",
//   });
//   const [errorMsg, setErrorMsg] = useState({
//     name: "",
//     email: "",
//     pass: "",
//     confirm: "",
//     general: "",
//   });
//   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

//   const handleSubmission = () => {
//     setErrorMsg({
//       name: !values.name ? "Fill your name" : "",
//       email: !values.email ? "Fill your email" : "",
//       pass: !values.pass ? "Enter a strong Password" : "",
//       confirm: !values.confirm ? "Confirm your password" : "",
//       general: "",
//     });

//     if (!values.name || !values.email || !values.pass || !values.confirm) {
//       return;
//     }

//     if (values.confirm !== values.pass) {
//       setErrorMsg({
//         ...errorMsg,
//         general: "Passwords do not match",
//       });
//       return;
//     }

//     setSubmitButtonDisabled(true);
//     createUserWithEmailAndPassword(auth, values.email, values.pass)
//       .then(async (res) => {
//         setSubmitButtonDisabled(false);
//         const user = res.user;
//         await updateProfile(user, {
//           displayName: values.name,
//         });
//         navigate("/");
//       })
//       .catch((err) => {
//         setSubmitButtonDisabled(false);
//         setErrorMsg({
//           ...errorMsg,
//           general: err.message,
//         });
//       });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.innerBox}>
//         <h1 className={styles.heading}>Signup</h1>

//         <div className={styles.inputField}>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             classname="name1"
//             placeholder="Enter your name"
//             onChange={(event) =>
//               setValues((prev) => ({ ...prev, name: event.target.value }))
//             }
//           />
//           <p className={styles.error}>{errorMsg.name}</p>
//         </div>

//         <div className={styles.inputField}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter email address"
//             onChange={(event) =>
//               setValues((prev) => ({ ...prev, email: event.target.value }))
//             }
//           />
//           <p className={styles.error}>{errorMsg.email}</p>
//         </div>

//         <div className={styles.inputField}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter password"
//             onChange={(event) =>
//               setValues((prev) => ({ ...prev, pass: event.target.value }))
//             }
//           />
//           <p className={styles.error}>{errorMsg.pass}</p>
//         </div>

//         <div className={styles.inputField}>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             placeholder="ReEnter Password"
//             onChange={(event) =>
//               setValues((prev) => ({ ...prev, confirm: event.target.value }))
//             }
//           />
//           <p className={styles.error}>{errorMsg.confirm}</p>
//         </div>

//         <div className={styles.footer}>
//           <b className={`${styles.error} ${errorMsg.general && styles.redText}`}>
//             {errorMsg.general}
//           </b>
//           <button onClick={handleSubmission} disabled={submitButtonDisabled}>
//             Signup
//           </button>
//           <p>
//             Already have an account?{" "}
//             <span>
//               <Link to="/login">Login</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


























//MY CODE

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirm: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name && !values.email && !values.pass && !values.confirm) {
      setErrorMsg("Fill your fields");
      return;
    }
    if(!values.name){
      setErrorMsg("Fill your name");
      return;
    }
    if(!values.email){
      setErrorMsg("Fill your email");
      return;
    }
    if(!values.pass){
      setErrorMsg("Enter a strong Password");
      return;
    }
    if(!values.confirm){
      setErrorMsg("Confirm your password");
      return;
    }

    if(values.confirm != values.pass){
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <InputControl
          label="Confirm Password"
          placeholder="ReEnter Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, confirm: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import InputControl from "../InputControl/InputControl";
// import { auth } from "../../firebase";
// import styles from "./Signup.module.css";

// function Signup() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     pass: "",
//     confirm: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

//   const handleSubmission = () => {
//     if (!values.name && !values.email && !values.pass && !values.confirm) {
//       setErrorMsg("Fill your fields");
//       return;
//     }
//     if (!values.name) {
//       setErrorMsg("Fill your name");
//       return;
//     }
//     if (!values.email) {
//       setErrorMsg("Fill your email");
//       return;
//     }
//     if (!values.pass) {
//       setErrorMsg("Enter a strong Password");
//       return;
//     }
//     if (!values.confirm) {
//       setErrorMsg("Confirm your password");
//       return;
//     }

//     if (values.confirm !== values.pass) {
//       setErrorMsg("Passwords do not match");
//       return;
//     }
//     setErrorMsg("");

//     setSubmitButtonDisabled(true);
//     createUserWithEmailAndPassword(auth, values.email, values.pass)
//       .then(async (res) => {
//         setSubmitButtonDisabled(false);
//         const user = res.user;
//         await updateProfile(user, {
//           displayName: values.name,
//         });
//         navigate("/");
//       })
//       .catch((err) => {
//         setSubmitButtonDisabled(false);
//         setErrorMsg(err.message);
//         setValues((prevValues) => ({ ...prevValues, name: err.message }));
//       });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.innerBox}>
//         <h1 className={styles.heading}>Signup</h1>

//         <InputControl
//           label="Name"
//           placeholder="Enter your name"
//           value={values.name}
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, name: event.target.value }))
//           }
//         />
//         <InputControl
//           label="Email"
//           placeholder="Enter email address"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, email: event.target.value }))
//           }
//         />
//         <InputControl
//           label="Password"
//           placeholder="Enter password"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, pass: event.target.value }))
//           }
//         />

//         <InputControl
//           label="Confirm Password"
//           placeholder="ReEnter Password"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, confirm: event.target.value }))
//           }
//         />

//         <div className={styles.footer}>
//           <b className={styles.error}>{errorMsg}</b>
//           <button onClick={handleSubmission} disabled={submitButtonDisabled}>
//             Signup
//           </button>
//           <p>
//             Already have an account?{" "}
//             <span>
//               <Link to="/login">Login</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
