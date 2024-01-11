
export function isEmail(...email) {
  let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email.map(em => {
    if (!regexp.test(em.toLowerCase().trim()))
      throw new PsicoWaysError('Email inválido.');
  });
}

export default function senhaForte(senha) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[$!*&@#])[0-9a-zA-Z$!*&@#]{6,}$/
  if(!regex.test(senha))
    throw new PsicoWaysError('A senha deve conter no mínimo: 6 caracteres (sendo 1 especial) e 1 número', 403);
}

