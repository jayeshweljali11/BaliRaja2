const SlidingPageModel = require('../schema/slidingPage.shema')

class SlidingPageService {
  async getAllSlidingPages() {
    try {
      const slidingPages = await SlidingPageModel.find();
      return slidingPages;
    } catch (error) {
      throw error;
    }
  }

  async createSlidingPage(slidingPageData) {
    try {
      const newSlidingPage = new SlidingPageModel(slidingPageData);
      const savedSlidingPage = await newSlidingPage.save();
      return savedSlidingPage;
    } catch (error) {
      throw error;
    }
  }

  async getSlidingPageById(id) {
    try {
      const slidingPage = await SlidingPageModel.findById(id);
      return slidingPage;
    } catch (error) {
      throw error;
    }
  }

  async updateSlidingPage(id, updatedData) {
    try {
      const updatedSlidingPage = await SlidingPageModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      return updatedSlidingPage;
    } catch (error) {
      throw error;
    }
  }

  async deleteSlidingPage(id) {
    try {
      const deletedSlidingPage = await SlidingPageModel.findByIdAndDelete(id);
      return deletedSlidingPage;
    } catch (error) {
      throw error;
    }
  }
}
 

module.exports = new SlidingPageService();
