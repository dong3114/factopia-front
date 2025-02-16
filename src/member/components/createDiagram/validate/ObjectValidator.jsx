const ObjectValidator = {
  /**
   * 🔹 객체의 ID 중복 검사
   * @param {Array} objects - 기존 객체 리스트
   * @param {string} newId - 새로 생성할 ID
   * @returns {boolean} 중복 여부 반환
   */
  isDuplicateId(objects, newId) {
    return objects.some(obj => obj.id === newId);
  },

  /**
   * 🔹 객체의 필수 속성 검사
   * @param {Object} object - 검증할 객체
   * @returns {string|null} 오류 메시지 또는 null 반환
   */
  validateProperties(object) {
    if (!object.id || !object.name) {
      return "ID 또는 이름이 누락되었습니다.";
    }
    return null;
  },

  /**
   * 🔹 공장 객체의 위치 및 크기 값 검증
   * @param {Object} object - 검증할 객체
   * @returns {string|null} 오류 메시지 또는 null 반환
   */
  validateSize(object) {
    if (object.x_end <= object.x_start || object.y_end <= object.y_start || object.z_end <= object.z_start) {
      return "크기 값이 올바르지 않습니다.";
    }
    return null;
  },

  /**
   * 🔹 전체 객체 유효성 검사 (모든 검증을 한 번에 수행)
   * @param {Array} objects - 기존 객체 리스트
   * @param {Object} newObject - 새로 생성할 객체
   * @returns {string|null} 오류 메시지 또는 null 반환
   */
  validateAll(objects, newObject) {
    if (this.isDuplicateId(objects, newObject.id)) {
      return "중복된 ID가 존재합니다.";
    }

    const propertyError = this.validateProperties(newObject);
    if (propertyError) return propertyError;

    const sizeError = this.validateSize(newObject);
    if (sizeError) return sizeError;

    return null;
  },
};

export default ObjectValidator;
