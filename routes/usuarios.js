
const { Router } = require('express');
const { body, param } = require('express-validator');

const {validarCampos, validarJWT, tieneRole} = require('../middlewares');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(existeUsuarioPorId),
    body('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password debe contener mas de 6 caracteres').isLength({min: 6}),
    body('correo', 'El correo no es válido').isEmail(),
    body('correo').custom(existeEmail),
    body('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;