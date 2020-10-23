// Homepage

$(() => {
  // On document ready
  const $moreButton = $('button.more');
  const $sorting = $('p.sorting');
  const bottomMessage = $('span.message');

  $sorting.on('click', 'label', (e) => {
    const sort = $(e.target).attr('name');
    console.log(sort);
    sortQuizzes(sort);
  })

  $moreButton.on('click', (e) => {
    // The more button should have a data attribute "currentpage" tracking the number of pages that have already been loaded
    const sort = 'popular';
    const currentPage = e.target.dataset.currentpage;
    loadMore($(e.target), currentPage, sort);
  });

});
