import React, {FC} from 'react';
import InputHinter from "../InputHinter/InputHinter";


interface RegisterFormProps {
}

const RegisterForm: FC<RegisterFormProps> = () => (
    <div className="w-1/2 bg-amber-100">

        <InputHinter //id="test_hinter"
            name="Email Hinter"
            type="text"
            className="mt-1 block w-full"
            //value={data.test_hinter}
        />

        <InputHinter //id="test_hinter"
            name="Password Hinter"
            type="text"
            className="mt-1 block w-full"
            //value={data.test_hinter}
        />
    </div>
);

export default RegisterForm;
