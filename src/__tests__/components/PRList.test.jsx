import { render, screen, fireEvent } from '@testing-library/react';
import PRList from '../../components/PRList';

const mockPRs = [
  {
    id: 1,
    number: 1,
    title: 'Fix bug in authentication',
    author: 'johndoe',
    url: 'https://github.com/example/pr/1',
    labels: [{ name: 'bug', color: '#ff0000' }],
  },
];

test('renders PRList with PR data', async () => {
  render(
    <PRList pullRequests={mockPRs} setSelectedLabel={() => {}} />
  );

  expect(screen.getByText('Fix bug in authentication')).toBeInTheDocument();
});

test('calls onLabelClick when label is clicked', () => {
  const onLabelClickMock = vi.fn();

  render(<PRList pullRequests={mockPRs} setSelectedLabel={onLabelClickMock} />);

  const label = screen.getByText('bug');
  fireEvent.click(label);

  expect(onLabelClickMock).toHaveBeenCalledTimes(1);
  expect(onLabelClickMock).toHaveBeenCalledWith('bug');
});
