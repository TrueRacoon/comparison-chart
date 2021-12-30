import { runInAction, makeAutoObservable } from 'mobx';
import getGoodsList from '../api/getGoods';
import { IGood } from '../models/IGood';
import { ISpecName } from '../models/ISpecName';
import getSpecsNames from '../api/getSpecsNames';

const defaultGoodsPerPage = 3;

class Store {
  goods: IGood[] = [];
  categoryName = "";
  specsNames: ISpecName[] = [];
  displayedGoodsIds: string[] = [];
  showOnlyDifferences = false;
  showModal = false;
  goodIdForReplacement: string | null = null;
  filterText = "";

  constructor() {
    makeAutoObservable(this);
  }

  async initStore() {
    this.goods = [];
    this.specsNames = [];
    try {
      const goodsResponse = await getGoodsList();
      runInAction(() => {
        this.goods = goodsResponse.data.goods;
        this.categoryName = goodsResponse.data.categoryName;
      });
      const specsNamesResponse = await getSpecsNames();
      runInAction(() => {
        this.specsNames = specsNamesResponse.data.specifications;
      })
    } catch (e) {
      runInAction(() => {
        console.error('Error while store initializing');
      })
    } finally {
      for (let i = 0; i < this.goods.length && this.displayedGoodsIds.length < defaultGoodsPerPage; i++) {
        this.displayedGoodsIds.push(this.goods[i].id);
        console.log('init pushed')
        console.log('now displayed goods:')
        console.log(this.displayedGoodsIds);
      }
    }
  }

  handleGoodsPerPage(goodsPerPage: number) {
    if (goodsPerPage > this.displayedGoodsIds.length) {
      for (let i = 0; i < this.goods.length && this.displayedGoodsIds.length < goodsPerPage; i++) {
        if (!this.displayedGoodsIds.includes(this.goods[i].id)) {
          this.displayedGoodsIds.push(this.goods[i].id);
        }
        console.log('pushed')
      }
    }
    if (goodsPerPage < this.displayedGoodsIds.length) {
      this.displayedGoodsIds = this.displayedGoodsIds.slice(0, goodsPerPage);
    }
    console.log(this.displayedGoodsIds);
  }

  get goodsToShow() {
    return this.goods.filter((good) => this.displayedGoodsIds.includes(good.id))
      .sort((a, b) => this.displayedGoodsIds.indexOf(a.id) - this.displayedGoodsIds.indexOf(b.id));
  }

  setShowOnlyDifference(state: boolean) {
    this.showOnlyDifferences = state;
  }

  setShowModal(state: boolean) {
    this.showModal = state;
  }

  setGoodIdForReplacement(id: string) {
    this.goodIdForReplacement = id;
  }

  setFilterText(text: string) {
    this.filterText = text;
  }

  get filteredReplacementGoods() {
    return this.goods.filter((good) =>
      !(this.displayedGoodsIds.includes(good.id))
      && good.name.includes(this.filterText)
    );
  }

  replaceGood(replacementGoodId: string) {
    if (this.goodIdForReplacement === null) {
      return;
    }

    let index = this.displayedGoodsIds.indexOf(this.goodIdForReplacement);

    if (~index) {
      this.displayedGoodsIds[index] = replacementGoodId;
    }

    console.log(this.displayedGoodsIds);
  }
}

export default new Store();
