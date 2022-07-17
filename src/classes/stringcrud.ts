export type StrigCrudDataType<T> = {
  id: number;
} & T;

export type StrigCrudDataArrayType<T> = StrigCrudDataType<T>[];

export class StringCrud<T> {
  private data: StrigCrudDataArrayType<T>;

  constructor(objectasstring?: string) {
    try {
      if (objectasstring) {
        this.data = JSON.parse(objectasstring) as StrigCrudDataArrayType<T>;
      } else {
        this.data = JSON.parse('[]') as StrigCrudDataArrayType<T>;
      }
    } catch (error) {
      throw new Error('Given String should be a stringified JSON Object');
    }
  }

  create(item: T) {
    const id =
      this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1;
    this.data.push({ id, ...item });
  }

  update(id: number, updateData: Partial<T>) {
    const index = this.data.findIndex((d) => d.id === id);
    this.data[index] = { ...this.data[index], ...updateData };
  }

  delete(id: number) {
    let foundedItem = this.data.findIndex((d) => d.id === id);
    if (foundedItem) {
      this.data.splice(foundedItem, 1);
    }
  }

  getParsedObject() {
    return this.data;
  }

  getResult() {
    return JSON.stringify(this.data);
  }
}
