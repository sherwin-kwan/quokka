// Homepage

$(() => {
  // On document ready
  const $sorting = $('p.sorting');
  let sort = 'popular';

  $sorting.on('click', 'label', (e) => {
    sort = $(e.target).attr('name');
    console.log(sort);
    sortQuizzes(sort);
  })

  $moreButton.on('click', (e) => {
    // The more button should have a data attribute "currentpage" tracking the number of pages that have already been loaded
    const currentPage = e.target.dataset.currentpage;
    loadMore($(e.target), currentPage, sort);
  });

});
