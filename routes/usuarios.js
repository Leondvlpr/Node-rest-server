
const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener mas de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;