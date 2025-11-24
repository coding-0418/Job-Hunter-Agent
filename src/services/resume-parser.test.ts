import { parseResumePdf } from "./resume-parser"

// Mock pdf-parse
jest.mock("pdf-parse", () => {
    return jest.fn().mockImplementation(async () => {
        return {
            text: `
        John Doe
        john.doe@example.com
        (123) 456-7890
        Software Engineer
        https://linkedin.com/in/johndoe
      `
        }
    })
})

describe("Resume Parser", () => {
    it("extracts basic information", async () => {
        const mockBuffer = Buffer.from("mock pdf content")
        const result = await parseResumePdf(mockBuffer)

        expect(result.name).toBe("John Doe")
        expect(result.email).toBe("john.doe@example.com")
        expect(result.phone).toBe("(123) 456-7890")
        expect(result.links).toContain("https://linkedin.com/in/johndoe")
    })
})
