import {
  ADD_COMBO,
  ADD_EXCERCISEW,
  ADD_EXCERCISEMP,
  CHANGE_DISTANCEW,
  CHANGE_DISTANCEMP,
  CHANGE_TYPEW,
  CHANGE_TYPEMP,
  ADD_COMBO_EXCERCISE,
  CHANGE_DISTANCE_COMBO,
  CHANGE_TYPE_COMBO,
  DELETE_EXCERCISEW,
  DELETE_EXCERCISEMP,
  DELETE_COMBO_EXCERCISE,
  CHANGE_DISTANCECD,
  CHANGE_TYPECD,
  RESET,
  SIGN_IN,
  SIGN_OUT,
  CHANGE_MULTIPLIER_COMBO,
  CHANGE_EXCERCISE_MULTI,
  CHANGE_DATE,
  ADD_TRAININGS,
  ADD_LOGS
} from './types'

export function changeDistance(id: string | number, d: number, dist: string | number) {
  switch (d) {
    case 0:
      return {
        type: CHANGE_DISTANCEW,
        id,
        dist
      }
    case 1:
      return {
        type: CHANGE_DISTANCEMP,
        id,
        dist
      }
    case 2:
      return {
        type: CHANGE_DISTANCECD,
        id,
        dist
      }
  }
}

export function changeType(id: string | number, d: number, option: string) {
  switch (d) {
    case 0:
      return {
        type: CHANGE_TYPEW,
        id,
        option
      }
    case 1:
      return {
        type: CHANGE_TYPEMP,
        id,
        option
      }
    case 2:
      return {
        type: CHANGE_TYPECD,
        id,
        option
      }
  }
}

export function changeTypeCombo(id: string | number, key: number, option: string) {
  return {
    type: CHANGE_TYPE_COMBO,
    id,
    key,
    option
  }
}

export function changeDistanceCombo(id: string | number, key: number, dist: string | number) {
  return {
    type: CHANGE_DISTANCE_COMBO,
    id,
    key,
    dist
  }
}

export function addExcercise(d: number, id: string | number = 0) {
  switch (d) {
    case 0:
      return {
        type: ADD_EXCERCISEW
      }
    case 1:
      return {
        type: ADD_EXCERCISEMP,
        id
      }
  }
}

export function addCombo(combo: any) {
  return {
    type: ADD_COMBO,
    id: combo
  }
}

export function addComboExcercise(key: number) {
  return {
    type: ADD_COMBO_EXCERCISE,
    key
  }
}

export function deleteExcercise(id: string | number, d: number) {
  switch (d) {
    case 0:
      return {
        type: DELETE_EXCERCISEW,
        id
      }
    case 1:
      return {
        type: DELETE_EXCERCISEMP,
        id
      }
  }
}

export function deleteComboExcercise(id: string | number, key: number) {
  return {
    type: DELETE_COMBO_EXCERCISE,
    id,
    key
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

export function afterSignIn(user: Object) {
  return {
    type: SIGN_IN,
    user
  }
}

export function afterSignOut() {
  return {
    type: SIGN_OUT
  }
}

export function changeMultiplierCombo(id: any, multi: any) {
  return {
    type: CHANGE_MULTIPLIER_COMBO,
    id,
    multi
  }
}

export function changeExcerciseMulti(id: any, multi: any) {
  return {
    type: CHANGE_EXCERCISE_MULTI,
    id,
    multi
  }
}

export function changeDate(date: any) {
  return {
    type: CHANGE_DATE,
    date
  }
}

export function addTrainings(logs: any) {
  return {
    type: ADD_TRAININGS,
    logs
  }
}

export function addLogs(logs: any) {
  return {
    type: ADD_LOGS,
    logs
  }
}