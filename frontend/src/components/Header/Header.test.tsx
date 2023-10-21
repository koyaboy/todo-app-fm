import { render, screen } from "@testing-library/react"
import { Header } from "./Header"

describe('Header', () => {
    test('renders correctly', () => {
        render(<Header />)

        const title = screen.getByText("TODO")
        expect(title).toBeInTheDocument()

        const themeIcon = screen.getByRole('img')
        expect(themeIcon).toBeInTheDocument()
    })

    //Theme test
})