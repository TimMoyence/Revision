import Joi from 'joi';

// afin de créer un schema de validation Joi, on doit décrire de quel façon l'objet (input data)
// doit être formaté.

// Pour cela on utilise les méthodes mise à dispo par le module Joi. on doit créer un objet de
// comparaison qui correspond au schéma.
export default Joi.object({
  // Dans cette objet on doit décrire chacune des propriété et fournissant les restriction de
  // chacune

  // Ici on dit que les valeurs doivent être de type "string" et une longueur minumum de 2 caractère
  name: Joi.string().min(2),
  adjective: Joi.string().min(2),
  verb: Joi.string().min(1),
  complement: Joi.string().min(2),
})
// On peut également ajouter des restriction sur l'ensemble de l'objet

// On dit que l'objet est obligatoire
  .required()
// On dit que l'objet doit avoir au moins une propriété fourni
  .min(1);

// sans commentaire en plus succint cela donne :
// const schema = Joi.object().required().min();
// ou

// const schema = Joi.object();
// schema.required();
// schema.min(1);
