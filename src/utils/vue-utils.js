/**
 * Utils regarding to Vue js
 * @author Base22, Miguel Rafael González Durón
 */
class VueUtils {
  static _isUndefined(parameter) {
    return typeof parameter === "undefined";
  }

  static _areAllrequiredParametersSet(Vue, componentMetadata) {
    let isEverythingOk = true;
    if (this._isUndefined(Vue)) {
      isEverythingOk = false;
    }
    if (this._isUndefined(componentMetadata)) {
      isEverythingOk = false;
    }
    if (this._isUndefined(componentMetadata.component)) {
      isEverythingOk = false;
    }
    if (this._isUndefined(componentMetadata.mountElement)) {
      isEverythingOk = false;
    }
    return isEverythingOk;
  }

  /**
   * @function mountComponent
   * @static
   * @this {VueUtils}
   * @param {Vue} Vue A valid vue function.
   * @param {Object} componentMetadata Specifies the component metadata for mounting a component in DOM.
   * @param {VueComponent} componentMetadata.component The current Vue Component to be mounted.
   * @param {Object} [componentMetadata.options] The options object for the Vue Component.
   * @param {string} componentMetadata.mountElement The element in which the Vue Component will be mounted.
   *
   */
  static mountComponent(Vue, componentMetadata) {
    if (!this._areAllrequiredParametersSet(Vue, componentMetadata)) return;
    const { component, options, mountElement } = componentMetadata;
    const Component = Vue.extend(component);
    const instance = new Component(options);
    instance.$mount(mountElement);
  }
}

export { VueUtils };
