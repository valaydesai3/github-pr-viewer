import { render, screen, fireEvent } from '@testing-library/react';
import PRCard from '../../components/PRCard';

const mockPR = {
  id: 1,
  number: 101,
  title: 'Fix authentication issue',
  author: 'johndoe',
  url: 'https://github.com/example/pr/101',
  labels: [
    { name: 'bug', color: '#ff0000', description: 'Indicates a bug' },
    { name: 'enhancement', color: '#00ff00', description: 'Feature improvement' },
  ],
};

test('renders PR details correctly', () => {
  render(<PRCard pr={mockPR} onLabelClick={() => {}} />);

  expect(screen.getByText('Fix authentication issue')).toBeInTheDocument();
  expect(screen.getByText('#101')).toBeInTheDocument();
  expect(screen.getByText('by johndoe')).toBeInTheDocument();
});

test('renders PR labels with correct styles', () => {
  render(<PRCard pr={mockPR} onLabelClick={() => {}} />);

  const bugLabel = screen.getByText('bug');
  expect(bugLabel).toBeInTheDocument();
  expect(bugLabel).toHaveStyle({ backgroundColor: '#ff0000' });

  const enhancementLabel = screen.getByText('enhancement');
  expect(enhancementLabel).toBeInTheDocument();
  expect(enhancementLabel).toHaveStyle({ backgroundColor: '#00ff00' });
});

test('opens PR link when title is clicked', () => {
  render(<PRCard pr={mockPR} onLabelClick={() => {}} />);

  const titleLink = screen.getByText('Fix authentication issue');
  expect(titleLink.closest('a')).toHaveAttribute('href', 'https://github.com/example/pr/101');
});

test('calls onLabelClick when a label is clicked', () => {
  const onLabelClickMock = vi.fn();
  render(<PRCard pr={mockPR} setSelectedLabel={onLabelClickMock} />);

  const bugLabel = screen.getByText('bug');
  fireEvent.click(bugLabel);

  expect(onLabelClickMock).toHaveBeenCalledTimes(1);
  expect(onLabelClickMock).toHaveBeenCalledWith('bug');
});
