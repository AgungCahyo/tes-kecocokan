import { ArrowRight, Users } from "lucide-react";

export default function Person2({ person2Name, person1Name, setStep}) {
    return (
         <div className="min-h-screen flex items-center justify-center p-4">
                  <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="text-center">
                      <Users className="w-20 h-20 mx-auto mb-6 text-purple-500" />
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Giliran {person2Name}!
                      </h1>
                      <p className="text-lg text-gray-600 mb-8">
                        {person1Name} sudah selesai mengisi tes. Sekarang giliran {person2Name} untuk menjawab pertanyaan yang sama.
                      </p>
        
                      <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                      >
                        Mulai Tes {person2Name} <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
    )
}