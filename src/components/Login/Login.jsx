import React, {useContext, useState} from 'react';
import "./styles.css";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {Button, Form, Icon, Input, Modal} from "semantic-ui-react";
import CustomModal from "../CustomModal";
import AuthContext from "../../context/auth/authContext";

const Login = () => {

  /* STATES */
  const [error, setError] = useState(null);

  /* CONTEXT */
  const { loading, titleModal, sizeModal, openLogin, closeModal, login } = useContext(AuthContext);

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Formato de email inválido").required("Campo email es requerido"),
      password: Yup.string().required("Campo contraseña es requerido")
    }),

    onSubmit: async (formData) => {
      setError(null);

      const response = await login(formData);

      if (!response) {
        formik.resetForm();
      }

      if (response.error) {
        setError(response.error);
      }
    }
  })


  return (
    <CustomModal
      size={sizeModal}
      open={openLogin}
      onClose={() => {formik.resetForm();closeModal();}}
    >
      <Modal.Header className="title-modal">{titleModal}</Modal.Header>
      <Modal.Content>
        {error && <span className="error-login">{error}</span>}

        <Form onSubmit={formik.handleSubmit} className="form-login">
          <Form.Field>
            <label htmlFor="email">Email</label>
            <Input iconPosition='left' transparent>
              <Icon name='at'/>
              <input
                id="email"
                type="text"
                name="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Input>
            {formik.errors.email && formik.touched.email
              ? (<span className="field-error">{formik.errors.email}</span>)
              : null
            }
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Contraseña</label>
            <Input iconPosition='left' transparent>
              <Icon name='lock'/>
              <input
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Input>
            {formik.errors.password && formik.touched.password
              ? (<span className="field-error">{formik.errors.password}</span>)
              : null
            }
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions className="actions-modal-login">
        <Button type="submit" loading={loading} onClick={() => formik.handleSubmit()}>
          INGRESAR
        </Button>
      </Modal.Actions>
    </CustomModal>
  );
};

export default Login;
