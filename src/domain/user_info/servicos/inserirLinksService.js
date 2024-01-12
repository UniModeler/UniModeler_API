import * as repo from '#infra/repository/teste/index';

export async function inserirLinkService(infoLink) {
    let r = await repo.modify.insertSharedLink(infoLink);

    return r;
}