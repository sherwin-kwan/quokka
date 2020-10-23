// Homepage

$(() => {
  // On document ready
  const $moreButton = $('button.more'); // Should be equated to the button once we have it


  $moreButton.on('click', (e) => {
    // The more button should have a data attribute "currentpage" tracking the number of pages that have already been loaded
    const sort = 'popular';
    const currentPage = e.target.dataset.currentpage;
    loadMore($(e.target), currentPage, sort);
  });

});
