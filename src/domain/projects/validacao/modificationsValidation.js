export function validateUpdate(updateResponse) {
  if(updateResponse.modifiedCount === 0) 
    throw new UniModelerError("Could not update.")
}

export function validateDeletion(deletionResponse) {
  if(deletionResponse.deletedCount === 0) 
    throw new UniModelerError("Could not delete.")
}