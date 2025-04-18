import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
    const axiosPublic=useAxiosPublic()

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				const useInfo = { email: currentUser.email };
				axiosPublic.post("/jwt", useInfo).then((res) => {
					if (res.data.token) {
						localStorage.setItem("access-token", res.data.token );
						setLoading(false);
					}
				});
			} else {
				localStorage.removeItem("access-token");
				setLoading(false);
			}
		});

		return () => {
			unSubscribe();
		};
	}, []);

	const CreateUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const SignIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateName = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	const authInfo = {
		SignIn,
		user,
		CreateUser,
		loading,
		logOut,
		updateName,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default ContextProvider;
