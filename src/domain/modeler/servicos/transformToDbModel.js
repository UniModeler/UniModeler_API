import { estruturaObjeto } from '#infra/ast/DbModel'

export function transformToDbModel(code) {
  return estruturaObjeto(code);
}