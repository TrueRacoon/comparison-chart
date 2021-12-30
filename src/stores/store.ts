import { runInAction, makeAutoObservable } from 'mobx';
import getGoodsList from '../api/getGoods';
import { IGood } from '../models/IGood';
import { ISpecName } from '../models/ISpecName';
import getSpecsNames from '../api/getSpecsNames';

const defaultGoodsPerPage = 3;

class Store {
  goods: IGood[] = [];

  categoryName = '';

  specsNames: ISpecName[] = [];

  displayedGoodsIds: string[] = [];

  showOnlyDifferences = false;

  showModal = false;

  goodIdForReplacement: string | null = null;

  filterText = '';

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
      });
    } catch (e) {
      runInAction(() => {
        // eslint-disable-next-line no-console
        console.error('Error while store initializing');
      });
    } finally {
      for (
        let i = 0;
        i < this.goods.length && this.displayedGoodsIds.length < defaultGoodsPerPage;
        i += 1
      ) {
        this.displayedGoodsIds.push(this.goods[i].id);
      }
    }
  }

  handleGoodsPerPage(goodsPerPage: number) {
    if (goodsPerPage > this.displayedGoodsIds.length) {
      for (
        let i = 0;
        i < this.goods.length && this.displayedGoodsIds.length < goodsPerPage;
        i += 1
      ) {
        if (!this.displayedGoodsIds.includes(this.goods[i].id)) {
          this.displayedGoodsIds.push(this.goods[i].id);
        }
      }
    }
    if (goodsPerPage < this.displayedGoodsIds.length) {
      this.displayedGoodsIds = this.displayedGoodsIds.slice(0, goodsPerPage);
    }
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
    return this.goods.filter((good) => !(this.displayedGoodsIds.includes(good.id))
      && good.name.includes(this.filterText));
  }

  replaceGood(replacementGoodId: string) {
    if (this.goodIdForReplacement === null) {
      return;
    }

    const index = this.displayedGoodsIds.indexOf(this.goodIdForReplacement);

    // eslint-disable-next-line no-bitwise
    if (~index) {
      this.displayedGoodsIds[index] = replacementGoodId;
    }
  }
}

export default new Store();
