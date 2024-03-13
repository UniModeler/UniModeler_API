import { estruturaObjeto } from '#infra/ast/DbModel'

export function transformToDbModel(code) {
  try {
    return estruturaObjeto(code);
  } catch (error) {
    throw new UniModelerError('Syntax error: line ' + error.loc.line);
  }
}