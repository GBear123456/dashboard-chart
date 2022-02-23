import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UseFirestore from "../../hooks/useFilestore"

import { login } from '~/services/auth';

import { Form, Container } from './styles';
import { getDefaultFormatCodeSettings } from 'typescript';

const SignIn = () => {
    var history = useHistory();
    const [email, setEmail] = useState(''); //luis@gmail.com
    const [password, setPassword] = useState(''); //12345678
    const [email_err, setEmailErr] = useState('');
    const [password_err, setPasswordErr] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Dashboard - Login';
        /*
            let seed_infos = [
                {id: 1, year: "2001", quality:"High", status:1, count:70},
                {id: 2, year: "2002", quality:"High", status:1, count:45},
                {id: 3, year: "2003", quality:"High", status:1, count:86},
                {id: 4, year: "2004", quality:"High", status:1, count:80},
                {id: 5, year: "2005", quality:"High", status:1, count:74},
                {id: 6, year: "2001", quality:"Low", status:1, count:34},
                {id: 7, year: "2002", quality:"Low", status:1, count:65},
                {id: 8, year: "2003", quality:"Low", status:1, count:31},
                {id: 9, year: "2004", quality:"Low", status:1, count:54},
                {id: 10, year: "2005", quality:"Low", status:1, count:44},
                {id: 11, year: "2001", quality:"High", status:2, count:89},
                {id: 12, year: "2002", quality:"High", status:2, count:94},
                {id: 13, year: "2003", quality:"High", status:2, count:32},
                {id: 14, year: "2004", quality:"High", status:2, count:88},
                {id: 15, year: "2005", quality:"High", status:2, count:67},
                {id: 16, year: "2001", quality:"Low", status:2, count:88},
                {id: 17, year: "2002", quality:"Low", status:2, count:37},
                {id: 18, year: "2003", quality:"Low", status:2, count:66},
                {id: 19, year: "2004", quality:"Low", status:2, count:77},
                {id: 20, year: "2005", quality:"Low", status:2, count:85},
            ];
            useSetFirestore("dash_data", seed_infos);
         */
        
    }, []);

    async function handleSignIn(e) {
        e.preventDefault();
        const docs = await UseFirestore("dash_auth");
        console.log("login submited...", docs)
        // const { email, password } = this.state;

        if(email.length == 0) {
            setEmailErr("Invalid Data...");
        }

        if (password.length == 0) {
            setPasswordErr("Invalid Data...")
        }

        if (!email || !password) {
            setError("Information is not complete...");

        } else {
            try {
                // Connect to API

                // const response = await api.post("/users/auth", {
                //     email,
                //     password
                // });

                // If your using API, erase this line and show 'Connect to API' & 'Set JWT in localstorage'
                let auth_flg = 0;
                console.log('GBear: confirm ', docs, docs.docs[0].email, docs.docs[0].password, docs.docs.length);
                for (let i=0; i<docs.docs.length; i++) {
                    if(email.toLowerCase() === docs.docs[i].email.toLowerCase() && password === docs.docs[i].password) {
                        
                        auth_flg = 1;
                        break;
                    }
                }

                if (auth_flg === 0)
                {
                    setError("Information is not complete. Please try again.");
                    return 0;
                }

                // Set JWT in localstorage
                login(true);

                history.push('/');
            } catch (err) {
                setError("submit is failed...")
            }
        }
    }

    return (
        <>
        <Container style={{ height: '100vh', padding: "0 10px"}}>
            <Form autoComplete="off" onSubmit={handleSignIn}>
                <div style={{marginBottom: 10, padding: 3, border: 3, fontSize: 20, color: 'red'}}>Log in</div>
                {error && <p>{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="input Email.."
                    onChange={(e) => { setEmail(e.target.value); setEmailErr('') }}
                    value={email}
                    className={email_err != '' ? 'invalid' : '' }
                />
                <input
                    type="password"
                    name="password"
                    placeholder="input the password"
                    onChange={(e) => { setPassword(e.target.value); setPasswordErr('') }}
                    value={password}
                    className={password_err != '' ? 'invalid' : '' }
                />
                <button type="submit">Enter</button>
                <hr />
                <Link to="/signup">Have no account? Sign up.</Link>
            </Form>
        </Container>
        </>
    );

}

export default SignIn;
