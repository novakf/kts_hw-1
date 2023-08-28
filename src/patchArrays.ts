// @ts-nocheck

const patchArrays = (): void => {
  Array.prototype.count = function () {
    let amount = 0;
    while (this[amount] !== undefined) {
      amount++;
    }
    return amount;
  };

  Array.prototype.insert = function (index: number, value: any) {
    if (typeof index !== 'number') throw new Error('INVALID_ARGUMENT');
    if (index < 0) index = 0;
    if (index > this.length) index = this.length;

    for (let i = this.length; i > index; i--) {
      this[i] = this[i - 1];
    }
    this[index] = value;

    return this;
  };

  Array.prototype.remove = function (value: any) {
    let desiredIndex = -1;
    for (let i = 0; i < this.length; i++) {
      if (this[i] === value) desiredIndex = i;
      if (desiredIndex !== -1) break;
    }

    if (desiredIndex !== -1) {
      for (let i = desiredIndex; i < this.length; i++) {
        this[i] = this[i + 1];
      }
      this.length--;
    }

    return this;
  };
};

export default patchArrays;
